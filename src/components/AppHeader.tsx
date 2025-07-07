import {
  Avatar,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Text,
  Tooltip,
  makeStyles,
} from "@fluentui/react-components";
import { NavLink, useMatch } from "react-router";
import { tokens } from "@fluentui/react-theme";
import { useCurrentUserHasEditPermissions } from "src/api/permissionsApi";
import { useMyRoles } from "src/api/Roles/rolesApi";

/* FluentUI Styling */
const useStyles = makeStyles({
  navHeader: {
    display: "flex",
    position: "fixed",
    zIndex: 1000,
    width: "100%",
    height: "3em",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor:
      import.meta.env.MODE === "testing"
        ? tokens.colorPaletteDarkOrangeBackground3
        : tokens.colorBrandBackground,
  },
  navHeaderPadding: {
    height: "3em",
  },
  navHeaderSiteName: {
    fontWeight: "bold",
    fontSize: "1.5em",
  },
  navLink: {
    marginLeft: "1em",
    marginRight: "1em",
    textDecorationLine: "none",
    ":hover": { textDecorationLine: "underline" },
    color: tokens.colorBrandBackgroundInverted,
  },
  subNavLink: {
    marginLeft: "1em",
    marginRight: "1em",
    textDecorationLine: "none",
    ":hover": { textDecorationLine: "underline" },
  },
  navHelp: {
    marginLeft: "auto",
    marginRight: "1em",
    textDecorationLine: "none",
    ":hover": { textDecorationLine: "underline" },
    color: tokens.colorBrandBackgroundInverted,
  },
  navAvatar: { marginLeft: "1em", marginRight: "5px" }, // Force the Avatar icon to be positioned at the right most side
});

declare const _spPageContextInfo: {
  userId: number;
  userDisplayName: string;
  userEmail: string;
};

export const AppHeader = () => {
  const classes = useStyles();
  const match = useMatch({ path: "/p/:program", end: false });
  const program = match?.params?.program;

  const mainPerms = useCurrentUserHasEditPermissions();
  const programPerms = useCurrentUserHasEditPermissions(program);

  const roles = useMyRoles(program);

  const showAdmin = mainPerms.data || programPerms.data;

  return (
    <>
      <div role="heading" aria-level={1} className={classes.navHeader}>
        <NavLink className={classes.navLink} to="/">
          <Text className={classes.navHeaderSiteName}>PCOL Home</Text>
        </NavLink>
        {program && (
          <NavLink className={classes.navLink} to={"/p/" + program}>
            <Text className={classes.navHeaderSiteName}>{program} Home</Text>
          </NavLink>
        )}
        {program && (
          <NavLink to={"/p/" + program + "/New"} className={classes.navLink}>
            New PCOL
          </NavLink>
        )}
        {showAdmin && (
          <NavLink
            to={(program ? "/p/" + program : "") + "/Admin"}
            className={classes.navLink}
          >
            Admin Pages
          </NavLink>
        )}
        <NavLink
          to={(program ? "/p/" + program : "") + "/Help"}
          className={classes.navHelp}
        >
          Help
        </NavLink>
        <Popover trapFocus={true} closeOnScroll={true} withArrow={true}>
          <PopoverTrigger>
            <Tooltip
              relationship="description"
              content={_spPageContextInfo.userDisplayName}
            >
              <Avatar
                className={classes.navAvatar}
                image={{
                  src:
                    "/_layouts/15/userphoto.aspx?accountname=" +
                    _spPageContextInfo.userEmail +
                    "&size=S",
                }}
                name={_spPageContextInfo.userDisplayName}
                size={32}
              ></Avatar>
            </Tooltip>
          </PopoverTrigger>
          <PopoverSurface aria-label="Your roles">
            <ul>
              {roles.isPKAdmin && <li>PK Admin</li>}
              {roles.isAdmin && <li>Program Admin</li>}
              {roles.isCO && <li>CO</li>}
              {roles.isDistributor && <li>Distributor</li>}
              {roles.isReviewer && <li>Reviewer</li>}
            </ul>
          </PopoverSurface>
        </Popover>
      </div>
      {/* The below div is set to the same height of the above div,
              to ensure all content loaded has proper padding at the top so that it isn't below the header */}
      <div className={classes.navHeaderPadding}></div>
    </>
  );
};
