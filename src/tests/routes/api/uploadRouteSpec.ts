import supertest from 'supertest'; 
import app from '../../../server';


const request = supertest(app);

// test upload route 'api/images/upload' with a post request and a file
describe('Test endpoint responses from uploadRoute', (): void => {
    it('Post image  via the api/images/upload endpoint', async ():Promise<void> => {
        const response = await request.post('/api/images/upload').attach('image', 'src/tests/testImages/Sample.jpg');
        expect(response.status).toBe(200);

    });
    it("handles empty post request well", async (): Promise<void> => {
        const response = await request.post("/api/images/upload");
        expect(response.status).toBe(200);
    });

});



