import { IPost } from "@/types/post";
import { ClientSDK } from "hcms-core";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { getCollectionMethod } from "@/lib/collections";
import { db } from "@/lib/db";

interface IpageProps {}
export default async function page(props: IpageProps) {

  const posts: IPost[] = await getCollectionMethod("post", "list").fn(db, {});
  return (
    <div>
      <div style={{ padding: "20px" }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            mb: 4, 
            fontWeight: 'bold',
            borderBottom: '2px solid #eaeaea',
            pb: 2
          }}
        >
          Blog Posts
        </Typography>
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Created: {new Date(post.created_at).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                    dangerouslySetInnerHTML={{ __html: post.bodyhtml }}
                  />
                </CardContent>
                <CardActions>
                  <Button href={`/blog/${post.slug}`} size="small" color="primary">
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
