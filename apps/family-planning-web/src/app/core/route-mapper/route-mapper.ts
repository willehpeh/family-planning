export class RouteMapper {

  private _routes: Record<string, any> = {};

  register(route: string, data: string): void {
    const urlParts = route.split('/');
    if (urlParts.length === 1) {
      this._routes[route] = data;
      return;
    }
    let current = this._routes;
    for (let i = 0; i < urlParts.length; i++) {
      const part = urlParts[i];
      if (i === urlParts.length - 1) {
        current[part] = data;
        return;
      }
      current[part] = current[part] || {};
      current = current[part];
    }
  }

  match(route: string): string {
    const urlParts = route.split('/');
    let current = this._routes;
    for (let i = 0; i < urlParts.length; i++) {
      const part = urlParts[i];
      if (typeof current[part] === 'object' && i < urlParts.length - 1) {
        current = current[part];
        continue;
      }
      if (typeof current[part] === 'string' && i === urlParts.length - 1) {
        return current[part];
      }
      const parameter = Object.keys(current).find(key => key.startsWith(':'));
      if (parameter) {
        if (i < urlParts.length - 1) {
          current = current[parameter];
          continue;
        }
        return current[parameter];
      }
    }
    throw new Error('No route found');
  }
}
