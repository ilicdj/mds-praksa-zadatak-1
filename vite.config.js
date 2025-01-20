import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [
    glsl()
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const extType = path.extname(assetInfo.name);
          
          // Define file type mappings
          const typeMap = {
            // Images (added webp)
            image: /\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i,
            // Fonts
            font: /\.(woff2?|eot|ttf|otf)$/i,
            // Audio
            audio: /\.(mp3|wav|ogg|m4a)$/i,
            // 3D Models
            model: /\.(gltf|glb|obj|fbx)$/i,
            // CSS
            css: /\.css$/i,
            // GLSL shaders
            shader: /\.(glsl|vert|frag)$/i
          };

          // Return appropriate path based on file type
          if (typeMap.image.test(extType)) return 'assets/images/[name].[ext]';
          if (typeMap.font.test(extType)) return 'assets/fonts/[name].[ext]';
          if (typeMap.audio.test(extType)) return 'assets/audio/[name].[ext]';
          if (typeMap.model.test(extType)) return 'assets/models/[name].[ext]';
          if (typeMap.css.test(extType)) return 'assets/styles/[name].[ext]';
          
          // Default path for other assets
          return 'assets/[name].[ext]';
        },
        chunkFileNames: 'assets/scripts/[name].[hash].js',
        entryFileNames: 'assets/scripts/[name].[hash].js'
      }
    },
  }
});