import { HashRouter, Routes, Route } from "react-router";
import Home from "src/Home";
import { AppHeader } from "src/components/AppHeader";
import NotFound from "./NotFound";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@fluentui/react-components";
import { Suspense } from "react";
import Landing from "src/components/Landing";
import Help from "src/components/Help";
import NewForm from "src/components/New/NewForm";
import Admin from "src/components/Admin";

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
