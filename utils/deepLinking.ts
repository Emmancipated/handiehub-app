// import * as Linking from 'expo-linking';

// export interface DeepLinkConfig {
//   scheme: string;
//   host: string;
// }

// export const DEEP_LINK_CONFIG: DeepLinkConfig = {
//   scheme: 'handiehub',
//   host: 'handiehub.com',
// };

// export class DeepLinkHandler {
//   private static instance: DeepLinkHandler;
//   private router: any;

//   private constructor() {}

//   public static getInstance(): DeepLinkHandler {
//     if (!DeepLinkHandler.instance) {
//       DeepLinkHandler.instance = new DeepLinkHandler();
//     }
//     return DeepLinkHandler.instance;
//   }

//   public setRouter(router: any) {
//     this.router = router;
//   }

//   public async handleDeepLink(url: string): Promise<boolean> {
//     try {
//       console.log('Handling deep link:', url);

//       const parsedUrl = Linking.parse(url);
//       console.log('Parsed URL:', parsedUrl);

//       if (!parsedUrl.path) {
//         console.log('No path found in URL');
//         return false;
//       }

//       // Remove leading slash and handle different path formats
//       let path = parsedUrl.path.startsWith('/') ? parsedUrl.path.slice(1) : parsedUrl.path;

//       // Handle specific routes
//       const routeHandlers = {
//         'product': (slug: string) => this.router.push(`/product/${slug}` as any),
//         'seller': (id: string) => this.router.push(`/seller/${id}` as any),
//         'category': (id: string) => this.router.push(`/category/${id}` as any),
//         'handieman': (path: string) => this.router.push(`/handieman/${path}` as any),
//         'auth': (path: string) => this.router.push(`/auth/${path}` as any),
//         'checkout': (path: string) => this.router.push(`/checkout/${path}` as any),
//         'user': (path: string) => this.router.push(`/user/${path}` as any),
//       };

//       // Check for specific route patterns
//       for (const [route, handler] of Object.entries(routeHandlers)) {
//         if (path.startsWith(`${route}/`)) {
//           const param = path.replace(`${route}/`, '');
//           handler(param);
//           return true;
//         }
//       }

//       // Handle root path
//       if (path === '' || path === '/') {
//         this.router.push('/(tabs)' as any);
//         return true;
//       }

//       // Handle direct navigation for other paths
//       this.router.push(`/${path}` as any);
//       return true;

//     } catch (error) {
//       console.error('Error handling deep link:', error);
//       return false;
//     }
//   }

//   public async getInitialURL(): Promise<string | null> {
//     try {
//       return await Linking.getInitialURL();
//     } catch (error) {
//       console.error('Error getting initial URL:', error);
//       return null;
//     }
//   }

//   public addEventListener(callback: (event: { url: string }) => void) {
//     return Linking.addEventListener('url', callback);
//   }

//   public createDeepLink(path: string): string {
//     return `${DEEP_LINK_CONFIG.scheme}://${path}`;
//   }

//   public createWebDeepLink(path: string): string {
//     return `https://${DEEP_LINK_CONFIG.host}/${path}`;
//   }
// }

// // Export singleton instance
// export const deepLinkHandler = DeepLinkHandler.getInstance();
