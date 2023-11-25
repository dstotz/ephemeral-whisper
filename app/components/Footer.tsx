import { Container, Flex, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";
import { TextLogo } from "@/app/components/TextLogo";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Footer = () => {
  return (
    <>
      <Separator size="4" />
      <footer>
        <Container size="3" px="5" py="6" height="8">
          <Flex direction="column" gap="3" justify="center" align="center">
            <Link
              href="https://github.com/dstotz/ephemeral-whisper"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <TextLogo />
            </Link>

            <Text>© 2023 Derek Stotz</Text>
            <Link
              href="https://github.com/dstotz"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Flex direction="row" gap="2" justify="center" align="center">
                <GitHubLogoIcon />
                dstotz
              </Flex>
            </Link>
          </Flex>
        </Container>
      </footer>
    </>
  );
};
