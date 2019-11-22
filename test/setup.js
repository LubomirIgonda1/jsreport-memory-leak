afterAll(() => {
	jest.clearAllMocks()
	jest.resetModules()
	global.gc()
})

jest.setTimeout(10000)
