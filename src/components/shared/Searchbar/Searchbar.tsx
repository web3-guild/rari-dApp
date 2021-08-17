import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Button,
  Collapse,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Spinner } from "@chakra-ui/spinner";
import AppLink from "../AppLink";

// Hooks
import useDebounce from "hooks/useDebounce";
import { useState } from "react";
import useSWR from "swr";

// Utils
import axios from "axios";
import { ETH_TOKEN_DATA } from "hooks/useTokenData";
import { Column, Row } from "lib/chakraUtils";
import { FinalSearchReturn } from "types/search";
import { useMemo } from "react";
import { DEFAULT_SEARCH_RETURN } from "pages/api/search";
import { shortUsdFormatter } from "utils/bigUtils";
import AvatarWithBadge from "../Icons/AvatarWithBadge";
import { useAccountBalances } from "context/BalancesContext";
import { useRari } from "context/RariContext";

// Fetchers
const searchFetcher = async (
  text: string,
  ...addresses: string[]
): Promise<FinalSearchReturn | undefined> => {
  let url = `/api/search`;

  if (!text && !addresses.length) return undefined;
  if (text) url += `?text=${text}`;
  if (addresses.length) {
    for (let i = 0; i < addresses.length; i++) {
      url += `${url.includes("?") ? "&" : "?"}address=${addresses[i]}`;
    }
  }

  // if (!text) return undefined;
  return (await axios.get(url)).data;
};

const Searchbar = ({
  width,
  height = "55px",
  smaller = false,
  ...inputProps
}: {
  width?: any;
  height?: any;
  smaller?: boolean;
  [x: string]: any;
}) => {
  const { isAuthed } = useRari();

  const [val, setVal] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [balances, balancesToSearchWith] = useAccountBalances();

  const debouncedSearch = useDebounce([val, ...balancesToSearchWith], 200);


  const { data } = useSWR(debouncedSearch, searchFetcher, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const hasResults = useMemo(() => {
    if (!data) return false;
    // If any of the values in the `data` object has items, then we have some results.
    return Object.values(data).some((arr) => !!arr.length);
  }, [data, val]);

  const loading = !data;
  const authedLoading = !data && isAuthed;

  return (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      height="100%"
      width="100%"
      position="relative"
      bg="white"
      border="4px solid"
      borderRadius="xl"
      borderColor="grey"
      zIndex={2}
      id="Searchbox"
    >
      <InputGroup width={width ?? "100%"} h={height}>
        <InputLeftElement
          pointerEvents="none"
          height="100%"
          color="grey"
          children={
            // If there is a value typed in AND it is loading
            !!val && !!loading ? (
              <Spinner />
            ) : (
              <SearchIcon
                color={authedLoading ? "yellow.5  00" : "gray.300"}
                boxSize={5}
              />
            )
          }
          ml={1}
          mr={2}
        />
        <Input
          height="100%"
          width="100%"
          placeholder="Search by token, pool or product..."
          _placeholder={{
            color: "grey",
            fontWeight: "bold",
            fontSize: smaller
              ? "sm"
              : {
                  sm: "sm",
                  md: "md",
                },
            width: "100%",
          }}
          _focus={{ borderColor: "grey" }}
          onChange={({ target: { value } }) => setVal(value)}
          border="none"
          borderBottom={hasResults ? "1px solid grey" : ""}
          borderBottomRadius={hasResults ? "none" : "xl"}
          value={val}
          color="grey"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />
        {!smaller && (
          <Column
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            h="100%"
            width="100px"
            position="absolute"
            zIndex="5"
            right="0"
            mr={1}
          >
            <AppLink href="/explore">
              <Button colorScheme="green" _hover={{ transform: "scale(1.04)" }}>
                Explore
              </Button>
            </AppLink>
          </Column>
        )}
      </InputGroup>
      <Collapse
        in={hasResults && (!!val || focused)}
        unmountOnExit
        style={{ width: "100%" }}
      >
        <SearchResults
          results={data}
          handleResultsClick={() => setVal("")}
          hasResults={hasResults}
          smaller={smaller}
          balances={balances}
        />
      </Collapse>

      {/* )} */}
    </Column>
  );
};

export default Searchbar;

const SearchResults = ({
  results = DEFAULT_SEARCH_RETURN,
  hasResults,
  handleResultsClick,
  smaller,
  balances,
}: {
  results?: FinalSearchReturn;
  hasResults: boolean;
  handleResultsClick: () => void;
  smaller: boolean;
  balances?: { [address: string]: number };
}) => {
  const { tokens, fuse, tokensData } = results;

  return (
    <Column
      position="relative"
      w="100%"
      h="100%"
      maxHeight={smaller ? "200px" : "300px"}
      minHeight="100px"
      color="black"
      fontWeight="bold"
      zIndex={2}
      top={0}
      left={0}
      boxShadow="0 4.5px 3.6px rgba(0, 0, 0, 0.08), 0 12.5px 10px rgba(0, 0, 0, 0.18)"
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      overflowY="scroll"
    >
      {/* Tokens */}
      <Row
        pt={3}
        pl={2}
        mb={1}
        w="100%"
        h="100%"
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        expand
        color="grey"
      >
        <Text ml={2} fontWeight="bold" fontSize="sm">
          Tokens
        </Text>
      </Row>
      {tokens.map((token, i: number) => {
        const route =
          token.id === ETH_TOKEN_DATA.address
            ? `/token/eth`
            : `/token/${token.id}`;
        return (
          <AppLink href={route} w="100%" h="100%" key={i}>
            <Row
              p={2}
              pl={5}
              w="100%"
              h="100%"
              mainAxisAlignment="flex-start"
              crossAxisAlignment="center"
              key={i}
              _hover={{ bg: "grey" }}
              expand
              onClick={handleResultsClick}
              fontWeight={smaller ? "normal" : "bold"}
            >
              <Avatar src={tokensData[token.id]?.logoURL} boxSize={8} />
              <Text ml={2}>{token.symbol}</Text>
              {!smaller && balances && balances[token.id] && (
                <Text ml={"auto"}>{balances[token.id].toFixed(2)}</Text>
              )}
            </Row>
          </AppLink>
        );
      })}

      <Row
        pt={3}
        pl={2}
        mb={1}
        w="100%"
        h="100%"
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        expand
        color="grey"
      >
        <Text ml={2} fontSize="sm">
          Opportunities
        </Text>
      </Row>

      {fuse.map((fusePool, i: number) => {
        const route = `/fuse/pool/${fusePool.id}`;
        return (
          <AppLink href={route} w="100%" h="100%" key={i}>
            <Row
              p={2}
              pl={5}
              w="100%"
              h="100%"
              mainAxisAlignment="flex-start"
              crossAxisAlignment="center"
              key={i}
              _hover={{ bg: "grey" }}
              expand
              onClick={handleResultsClick}
              fontWeight={smaller ? "normal" : "bold"}
            >
              <AvatarWithBadge
                outerImage={tokensData[tokens[0].id]?.logoURL}
                badgeImage="/static/fuseicon.png"
              />
              <Text ml={2}>{fusePool.name}</Text>
              {!smaller && (
                <Text ml={"auto"}>
                  {shortUsdFormatter(fusePool.totalLiquidityUSD)} Liquidity
                </Text>
              )}
            </Row>
          </AppLink>
        );
      })}
    </Column>
  );
};
