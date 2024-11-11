"use client";
import { getCollections } from "@/lib/collections";
import {
  HomeOutlined
} from "@mui/icons-material";
import {
  Box,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IMenuListProps {
  mobile?: boolean;
}

interface MenuItem {
  id: string;
  name: string;
  items?: MenuItem[];
  path?: string;
  icon?: string;
}

export default function MenuList(props: IMenuListProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  let objCollections = getCollections();

  let menuItems: MenuItem[] = [];
  for (let [id, collection] of Object.entries(objCollections)) {
    for (let [menuItemId, menuItem] of Object.entries(
      collection.menuItems || {}
    )) {
      menuItems.push({
        id: menuItemId,
        name: menuItem.label || menuItemId,
        path: `/cms/${id}/${menuItemId}`,
        icon: menuItem.icon,
      });
    }
  }

  const toggleSubmenu = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: 280,
        height: "100vh",
        overflow: "auto",
        borderRadius: 0,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          p: 2,
          position: "sticky",
          top: 0,
          bgcolor: "background.paper",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          zIndex: 1,
        }}
      >
        <Typography
          variant="overline"
          color="textSecondary"
          sx={{ fontWeight: 500, letterSpacing: 1.2 }}
        >
          H-CMS
        </Typography>
      </Box>
      <List component="nav" sx={{ px: 1 }}>
        <ListItemButton
          onClick={() => {
            router.push("/");
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <HomeOutlined color="action" fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            primaryTypographyProps={{
              variant: "body2",
            }}
          />
        </ListItemButton>
        {menuItems.map((item) => {
          return (
            <ListItemButton
              key={item.id}
              onClick={() => {
                router.push(item.path || "/");
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon ? <Icon>{item.icon}</Icon> : <Icon>list</Icon>}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  variant: "body2",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
}
