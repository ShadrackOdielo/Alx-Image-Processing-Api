import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

// route test for default route
describe("A route not handled by the created endpoints", (): void => {
    it("should redirect succesfully", async (): Promise<void> => {
        const response = await request.get("/whjklk123123");
        expect(response.status).toBe(302);
    });
});

describe("Get the 'api/images' route with query params", () => {
    it("successfully opens /api/images/?filename=test.jpg", async (): Promise<void> => {
        const response = await request.get("/api/images/?filename=test.jpg");
        expect(response.status).toBe(200);

    });
        it("GETs '/api/images/?filename=test.jpg&height=250&width=300'", async (): Promise<void> => {
            const response = await request.get("/api/images/?filename=test.jpg&height=250&width=300");
            expect(response.status).toBe(200);
        });
});
