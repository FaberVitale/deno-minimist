export interface ParsedArgs {
  [arg: string]: unknown;

  /**
   * If opts['--'] is true, populated with everything after the --.
   */
  "--"?: string[];

  /**
   * Contains all the arguments that didn't have an option associated with them.
   */
  _: (string | number)[];
}

export type WithParsedArgs<T> = T & ParsedArgs;

export interface MinimistOptions {
  /**
   * A string or array of strings argument names to always treat as strings.         
   */
  string?: string | string[];

  /**
   * A boolean, string or array of strings to always treat as booleans. 
   * If true will treat all double hyphenated arguments without equals 
   * signs as boolean (e.g. affects `--foo`, not `-f` or `--foo=bar`).
   */
  boolean?: boolean | string | string[];

  /**
   * An object mapping string names to strings or arrays of 
   * string argument names to use as aliases.
   */
  alias?: { [key: string]: string | string[] };

  /**
   * An object mapping string argument names to default values.
   */
  default?: { [key: string]: unknown };

  /**
   * When true, populate argv._ with everything after the first non-option.
   */
  stopEarly?: boolean;

  /**
   * A function which is invoked with a command line parameter not defined in 
   * the opts configuration object.
   * If the function returns false, the unknown option is not added to argv.         
   */
  unknown?: (arg: string) => boolean;

  /**
   * When true, populate argv._ with everything before the -- and argv['--'] 
   * with everything after the --.
   * Note that with -- set, parsing for arguments still stops after the `--`.
   */
  "--"?: boolean;
}

export interface Minimist {
  /**
   * Parses an array of command line arguments.
   * 
   * @example
   * ```typescript
   * import parse from "https://deno.land/x/deno_minimist@v1.0.2/mod.ts";
   * import type { WithParsedArgs } from "https://deno.land/x/deno_minimist@v1.0.2/mod.ts";
   * const defaults = {
   *   version: "v1.0.0",
   *   port: 3000,
   * };
   * 
   * const argv = parse<WithParsedArgs<Record<keyof typeof defaults, unknown>>>(
   *   Deno.args,
   *   {
   *     default: defaults,
   *   },
   * );
   * ```
   */
  <T extends ParsedArgs>(args: string[], options?: MinimistOptions): T;
}
