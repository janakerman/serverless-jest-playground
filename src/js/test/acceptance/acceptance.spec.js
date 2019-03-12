beforeAll(async () => {
    this.apiGatewayEndpoint = await global.apiGatewayEndpoint
})

test('test', () => {
    console.log(`I got the endpoint: ${this.apiGatewayEndpoint}`)
    expect(1).toBe(1)
})
  
test('test1', () => {
    expect(1).toBe(1)
})
  
test('test2', () => {
    expect(1).toBe(1)
})
  
test('tes3t', () => {
    expect(1).toBe(1)
})
  
test('te4st', () => {
    expect(1).toBe(1)
})
  
test('te5st', () => {
    expect(1).toBe(1)
})
  