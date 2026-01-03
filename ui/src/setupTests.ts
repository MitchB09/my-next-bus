import "@testing-library/jest-dom/vitest"


// Required for RTK queries in tests
import nodeFetch, { Request, Response } from "node-fetch";

Object.assign(global, { fetch: nodeFetch, Request, Response });
