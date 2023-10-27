# Issue repro: SolidStart stream SSR suspense with random page click


1. initialize by running:

```
npm install
npm run dev
```

2. go to `http://localhost:3000/`
3. observe suspense fallback being shown
4. click or touch anywhere on the page before the promise resolves (4 seconds)
5. observe children of `Suspense` not being rendered, hydration error thrown


## Expected output

Should show the `Suspense` fallback until promise resolution and swap it with
the children of `Suspense` after.

## Actual output

Shows (and streams) the `Suspense` fallback, shows nothing after promise
resolution - the children of `Suspense` are not inserted.

Throws hydration error:

```
Error: Hydration Mismatch. Unable to find DOM nodes for hydration key: 0-0-0-0-0-0-0-0-0-1-0-0-0-0-2-1-0-0-4-0-1
    at getNextElement (dev.js:735:13)
    at index.tsx:7:3
    at _$$component.location (index.tsx:9:28)
    at @solid-refresh:25:42
    at untrack (dev.js:503:12)
    at HMRComp.createMemo.name [as fn] (@solid-refresh:25:28)
    at runComputation (dev.js:781:22)
    at updateComputation (dev.js:760:3)
    at Object.readSignal (dev.js:689:67)
    at resolveChildren (dev.js:1088:82)
```

Sometimes it's a different hydration error depending on the actual DOM nodes
involved, i.e. nodes being null, etc.


## Additional notes

- tested on latest chromium and FF
- happens in both dev and prod mode, however for this example it happens only
  in dev for some reason, I can make future repros if necessary
- also happens wihtout any browser extensions enabled (no DOM meddling)
