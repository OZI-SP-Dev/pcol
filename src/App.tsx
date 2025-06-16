import { HashRouter, Routes, Route } from "react-router";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@fluentui/react-components";
import { lazy, Suspense } from "react";
import { AppHeader } from "src/components/AppHeader";
import NotFound from "./NotFound";
import Landing from "src/components/Landing";

// Begin module downloads immediately, but still utilize lazy() for code splitting
const HomePromise = import("src/Home");
const Home = lazy(() => HomePromise);
const NewFormPromise = import("src/components/New/NewForm");
const NewForm = lazy(() => NewFormPromise);
const AdminPromise = import("src/components/Admin");
const Admin = lazy(() => AdminPromise);
const HelpPromise = import("src/components/Help");
const Help = lazy(() => HelpPromise);
const ViewPCOLPromise = import("src/components/ViewPCOL/ViewPCOL");
const ViewPCOL = lazy(() => ViewPCOLPromise);

function App() {
  return (
    <>
      <HashRouter>
        <AppHeader />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <div>
                  There was an error!
                  <Button onClick={() => resetErrorBoundary()}>
                    Try again
                  </Button>
                </div>
              )}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/p/:program" element={<Home />} />
                  <Route path="/p/:program/new" element={<NewForm />} />
                  <Route path="/p/:program/admin" element={<Admin />} />
                  <Route path="/p/:program/help" element={<Help />} />
                  <Route path="/p/:program/i/:pcolId" element={<ViewPCOL />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </HashRouter>
    </>
  );
}

export default App;
