import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"
// import Moraga from "typography-theme-moraga"
// import Lincoln from "typography-theme-lincoln"

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "body": {
      fontWeight: `300`,
    },
  }
}

delete Wordpress2016.googleFonts

// Moraga.overrideThemeStyles = () => {
//   return {
//     "body": {
//       fontWeight: `300`,
//     },
//     "a.gatsby-resp-image-link": {
//       boxShadow: `none`,
//     },
//   }
// }

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
