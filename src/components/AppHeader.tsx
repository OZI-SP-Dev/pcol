import { Text, makeStyles } from "@fluentui/react-components";
import { NavLink, useMatch } from "react-router";
import { tokens } from "@fluentui/react-theme";

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

export const AppHeader = () => {
  const classes = useStyles();
  const match = useMatch("/p/:program");

  return (
    <>
      <div role="heading" aria-level={1} className={classes.navHeader}>
        <NavLink className={classes.navLink} to="/">
          <Text className={classes.navHeaderSiteName}>PCOL Home</Text>
        </NavLink>
        {match?.params?.program && (
          <NavLink
            className={classes.navLink}
            to={"/p/" + match?.params?.program}
          >
            <Text className={classes.navHeaderSiteName}>
              {match?.params?.program} Home
            </Text>
          </NavLink>
        )}
        <NavLink to="/New" className={classes.navLink}>
          New PCOL
        </NavLink>
        <NavLink to="/Admin" className={classes.navLink}>
          Admin Pages
        </NavLink>
        <NavLink to="/Help" className={classes.navHelp}>
          Help
        </NavLink>
      </div>
      {/* The below div is set to the same height of the above div,
              to ensure all content loaded has proper padding at the top so that it isn't below the header */}
      <div className={classes.navHeaderPadding}></div>
    </>
  );
};
