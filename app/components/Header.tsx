import { Box, Container, Flex, Separator } from "@radix-ui/themes";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { TextLogo } from "./TextLogo";

type Props = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

export const Header = (props: Props) => {
  return (
    <header>
      <Box height="8" /> {/* Spacer for fixed top bar */}
      <Box
        className="rt-variant-solid"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <Container size="3" px="5" height="8">
          <Flex
            direction="row"
            align="center"
            justify="between"
            gap="5"
            height="8"
          >
            <Box>
              <Link
                href="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <TextLogo />
              </Link>
            </Box>

            <Box>
              {props.darkMode ? (
                <MoonIcon onClick={props.onToggleDarkMode} />
              ) : (
                <SunIcon onClick={props.onToggleDarkMode} />
              )}
            </Box>
          </Flex>
        </Container>
        <Separator my="0" size="4" />
      </Box>
    </header>
  );
};
