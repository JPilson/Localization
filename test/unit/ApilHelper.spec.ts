import APiHelper from "@/api/APiHelper";

describe("API Test", () => {
    const api = new APiHelper()
    it("Get User By UID", async () => {
        const data = await api.getUserByUId("GEnAmT5D9XRV86quVEvVlWVgPoD2")
        expect(data.uid).toEqual("GEnAmT5D9XRV86quVEvVlWVgPoD2")
    })
})
