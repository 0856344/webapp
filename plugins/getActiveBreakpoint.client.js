import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "~/tailwind.config.js";

const breakpoints = resolveConfig(tailwindConfig).theme.screens;
const breakpointsSorted = Object.entries(breakpoints)
  .sort((a, b) => a[1] - b[1])
  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

/**
 * Function to get the currently active Tailwind CSS breakpoint
 * returns the name of the breakpoint as a string
 * @returns {string | null }
 */

export default ({ app }, inject) => {
  inject("getActiveBreakpoint", () => {
    const activeBreakpoints = [];
    for (const [key, value] of Object.entries(breakpointsSorted)) {
      if (window.matchMedia(`(min-width: ${value})`).matches) {
        activeBreakpoints.push(key);
      }
    }
    return activeBreakpoints.length > 0 ? activeBreakpoints.slice(-1)[0] : null;
  });
};
