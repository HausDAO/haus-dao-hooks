# daohaus dao hooks

simple dao date fetching hooks.

wraps daohaus/yeeter subgraphs.

paste these into your project.

**set up**

```tsx
const daoHooksConfig = {
  graphKey: <env variable import>,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DaoHooksProvider keyConfig={daoHooksConfig}>
      <App />
    </DaoHooksProvider>
  </StrictMode>
);

```

**use**

```tsx
// useYeeter
```
