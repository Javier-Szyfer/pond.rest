import Link from "next/link";
// import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

import {
  Container,
  Box,
  Text,
  Divider,
  Heading,
  useMediaQuery,
  Flex,
  VStack,
  Image,
} from "@chakra-ui/react";

export default function Notes({ posts }) {
  const [isMobile] = useMediaQuery("(max-width: 840px)");
  console.log(posts);

  if (!posts || posts[0].meta.content === "") {
    return (
      <Container maxW="xl" mx="auto" pt="3rem">
        <Heading size="xl" as="h1" mr="4px">
          Notes
        </Heading>
        <Heading size="md" as="h1" fontWeight="normal" color="#b3b3b3">
          &rarr; <span> Interviews with modular artists around the globe</span>
        </Heading>
        <Divider m="2rem 0" bg="#808080" />
      </Container>
    );
  }
  return (
    <Container maxW="xl" mx="auto" pt="3rem">
      <Heading size="xl" as="h1" mr="4px">
        Notes
      </Heading>
      <Heading size="md" as="h1" fontWeight="normal" color="#b3b3b3">
        &rarr; <span> Interviews with modular artists around the globe</span>
      </Heading>
      <Divider m="2rem 0" />

      {posts.map((p) => (
        <Link href={p.path} key={p.path} passHref>
          <a>
            <Box
              m="1rem 0"
              p="2rem"
              borderRadius="0.375rem"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              cursor="pointer"
              bg="#141414"
              boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
              _hover={{ bg: isMobile ? "#181818" : "#181818" }}
            >
              <Heading size="sm" mb="1rem">
                &quot;{p.meta.data.snippet}&quot;
              </Heading>

              <Divider mb="1rem" />
              <Flex w="full" alignItems="center">
                {/* <Box w="100px" mr="2rem" rounded="lg"> */}
                <Image
                  src={p.meta.data.imageUrl}
                  borderRadius="full"
                  boxSize="120px"
                  mr="2rem"
                  // width={300}
                  // height={300}
                  objectFit="cover"
                  alt={`${p.meta.data.artistName} modular synth pic`}
                  // layout="responsive"
                />
                {/* </Box> */}

                <VStack alignItems="flex-start">
                  <Heading size="sm" color="#b3b3b3">
                    Artist: {p.meta.data.artistName}
                  </Heading>
                  <Heading size="sm" color="#b3b3b3">
                    Track: {p.meta.data.trackName}
                  </Heading>
                </VStack>
              </Flex>
            </Box>
          </a>
        </Link>
      ))}
    </Container>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(
    process.cwd(),
    process.env.NEXT_PUBLIC_POSTS_DIRECTORY
  );

  const filenames = await fs.readdir(postsDirectory);

  const files = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(fileContent);

      return {
        filename,
        meta: { data, content },
      };
    })
  );

  const p = files.map((file) => {
    return {
      path: `/posts/${file.filename.replace(".mdx", "")}`,
      meta: file.meta,
    };
  });
  const posts = p.sort(
    (a, b) => new Date(b.meta.data.date) - new Date(a.meta.data.date)
  );

  return {
    props: {
      posts,
    },
  };
}
