import { RouteMapper } from './route-mapper';

describe('RouteMapper', () => {
  let routeMapper: RouteMapper;

  beforeEach(() => {
    routeMapper = new RouteMapper();
  });

  it('should return the correct value for a simple route', () => {
    routeMapper.register('simple', 'simple data');
    expect(routeMapper.match('simple')).toBe('simple data');
  });

  it('should return the correct data for a route with a child', () => {
    routeMapper.register('parent/child', 'child data');
    expect(routeMapper.match('parent/child')).toBe('child data');
  });

  it('should throw an error if no route is found', () => {
    expect(() => routeMapper.match('not-found')).toThrow('No route found');
  });

  it('should return the correct data for a route with a parameter', () => {
    routeMapper.register('parent/:param', 'param data');
    expect(routeMapper.match('parent/123')).toBe('param data');
  });

  it('should return the correct data for a route with multiple parameters', () => {
    routeMapper.register('parent/:param1/:param2', 'param data');
    expect(routeMapper.match('parent/123/456')).toBe('param data');
  });

  it('should pick the correct route when there are multiple matches', () => {
    routeMapper.register('parent/:param1/:param2', 'param data');
    routeMapper.register('parent/:param1/child', 'child data');
    expect(routeMapper.match('parent/123/456')).toBe('param data');
    expect(routeMapper.match('parent/123/child')).toBe('child data');
  });
});
