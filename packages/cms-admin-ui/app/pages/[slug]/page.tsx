import { getCollectionMethod } from "@/lib/collections";
import { db } from "@/lib/db";
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { IPage } from "@/types/page";

interface IpageProps {
  params: Promise<{ slug: string }>;
}
export default async function page(props: IpageProps) {
  const { slug } = await props.params;
  const page: IPage = await getCollectionMethod("page", "getWithSlug").fn(db, {
    slug,
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: "bold",
            mb: 2,
          }}
        >
          {page?.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          {page?.created_at &&
            new Date(page.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
        </Typography>

        <Box
          sx={{
            "& img": {
              maxWidth: "100%",
              height: "auto",
            },
            "& p": {
              mb: 2,
              lineHeight: 1.7,
            },
          }}
          dangerouslySetInnerHTML={{ __html: page?.bodyhtml || "" }}
        />
      </Box>
    </Container>
  );
}
