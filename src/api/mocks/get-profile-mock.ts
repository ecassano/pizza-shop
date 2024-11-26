import { http, HttpResponse } from "msw";
import { GetProfile } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfile>("/me", () => {
  return HttpResponse.json({
    id: "custom-user-id",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "21930293093",
    role: "manager",
    createdAt: new Date(),
    updatedAt: null,
  });
});
