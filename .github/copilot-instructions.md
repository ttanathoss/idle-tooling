# Repository Instructions

## Project Conventions

- Keep changes focused and follow the existing React, TypeScript, Vite, and
  React Router structure.
- Use Tailwind utilities first for component layout and interaction styling.
  Use CSS for global styles and complex component treatments that are clearer
  outside utility classes.
- React Compiler is enabled. Do not add `useMemo` or `useCallback` by default;
  use them only when the code or measured behavior needs them.
- Use two spaces, double quotes, semicolons, and the configured Prettier style.
- Preserve existing APIs and unrelated save fields. Avoid broad refactors or
  formatting unrelated files as part of a behavioral change.
- Ask before adding or upgrading dependencies, especially runtime dependencies.
- Do not change TypeScript strictness or other compiler-wide settings without
  first explaining the likely impact.

## Forge & Fortune Save Logic

- Treat imported save data as external input. Validate required structure and
  item identifiers before using non-null assertions or mutating nested data.
- Save transforms must not mutate their input and must preserve fields unrelated
  to the requested transformation.
- Add focused tests for generated item combinations, counts, rarity/sharp
  values, resource totals, craft counts, and malformed inputs when behavior in
  those areas changes.
- Make randomness deterministic in tests by controlling `Math.random`.

## Validation

- Run `npm run lint`, `npm test`, `npm run format:check`, and `npm run build`
  for relevant changes. The build includes the TypeScript project check.
- For UI changes, verify the affected route, primary interaction, keyboard
  focus, and a narrow mobile viewport in a browser.
- Do not introduce lint warnings. The current baseline includes
  `react(set-state-in-effect)` in `src/forgeAndFortune/index.tsx`; avoid
  unrelated cleanup when working elsewhere.

## Other

- When reporting information to me, be extremely concise and sacrifice grammar for the sake of concision.
