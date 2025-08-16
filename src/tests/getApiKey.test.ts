import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import type { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns null if no authorization header", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null if authorization header is not in 'ApiKey <token>' format", () => {
    const headers: IncomingHttpHeaders = { authorization: "Bearer sometoken" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns the token if authorization header is correct", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey my-secret-token" };
    expect(getAPIKey(headers)).toBe("my-secret-token");
  });
});
