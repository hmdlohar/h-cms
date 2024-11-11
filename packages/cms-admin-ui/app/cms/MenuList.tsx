    "use client";
import { getCollections } from "@/lib/collections";
import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import {
  FolderOutlined,
  DescriptionOutlined,
  ExpandMore,
  ChevronRight,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface IMenuListProps {
  mobile?: boolean;
}

interface MenuItem {
  id: string;
  name: string;
  items?: MenuItem[];
}

export default function MenuList(props: IMenuListProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  let objCollections = getCollections();

  // Transform collections into menuItems structure and filter out collections without menu items
  const menuItems: MenuItem[] = Object.entries(objCollections)
    .map(([id, collection]) => ({
      id,
      name: collection.name || id,
      items: Object.entries(collection.menuItems || {}).map(([itemId, item]) => ({
        id: itemId,
        name: item.label || itemId,
      })),
    }))
    .filter((item) => item.items && item.items.length > 0);

  const toggleSubmenu = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.items && item.items.length > 0;

    if (!hasChildren) return null;

    return (
      <React.Fragment key={item.id}>
        <ListItemButton
          onClick={() => toggleSubmenu(item.id)}
          sx={{
            py: 1.5,
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <FolderOutlined color="action" />
          </ListItemIcon>
          <ListItemText
            primary={item.name}
            primaryTypographyProps={{
              variant: "body2",
              fontWeight: 500,
            }}
          />
          {expanded[item.id] ? (
            <ExpandMore color="action" sx={{ fontSize: 20 }} />
          ) : (
            <ChevronRight color="action" sx={{ fontSize: 20 }} />
          )}
        </ListItemButton>

        <Collapse in={expanded[item.id]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.items?.map((subItem) => (
              <ListItemButton
                key={subItem.id}
                sx={{
                  pl: 7,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
                onClick={() => {
                  router.push(`/cms/${item.id}/${subItem.id}`);
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <DescriptionOutlined color="action" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={subItem.name}
                  primaryTypographyProps={{
                    variant: "body2",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
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
          Collections
        </Typography>
      </Box>
      <List component="nav" sx={{ px: 1 }}>
        {menuItems.map((item) => renderMenuItem(item))}
      </List>
    </Paper>
  );
}