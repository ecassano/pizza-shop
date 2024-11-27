import { test, expect } from "@playwright/test";

test("update profile successfully", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

  await page.getByLabel("Nome").fill("Rocket Pizza");
  await page.getByLabel("Descrição").fill("Descrição sendo mudada");

  await page.getByRole("button", { name: "Salvar" }).click();

  //Vai aguardar por toda requisição http que esteja sendo feita a partir desse momento;
  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Perfil atualizado com sucesso");

  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Cancelar" }).click();

  await expect(
    page.getByRole("button", { name: "Rocket Pizza" }),
  ).toBeVisible();
});

test("update profile unsuccessfully", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

  await page.getByLabel("Nome").fill("Random Name");
  await page.getByLabel("Descrição").fill("Descrição sendo mudada");

  await page.getByRole("button", { name: "Salvar" }).click();

  //Vai aguardar por toda requisição http que esteja sendo feita a partir desse momento;
  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Falha ao atualizar o perfil, tente novamente");

  await expect(toast).toBeVisible();
});
