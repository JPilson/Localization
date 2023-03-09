import APiHelper from "@/api/APiHelper";

describe("API Test", () => {
    const api = new APiHelper()
    it("Get User By UID", async () => {
        const data = await api.getUserByUId("GEnAmT5D9XRV86quVEvVlWVgPoD2")
        expect(data === null).toBeFalsy()
        expect(data?.uid).toEqual("GEnAmT5D9XRV86quVEvVlWVgPoD2")
    })
    it("Get Project By Owner UID",async ()=>{
        const data = await api.getProjects("GEnAmT5D9XRV86quVEvVlWVgPoD2")
        console.log(data)
        expect((data === undefined || data === null)).toBeFalsy()
    })

})
