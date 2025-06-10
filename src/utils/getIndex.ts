// src/utils/getCategoriaIndex.ts
import ctfs from "../../public/data/ctfs/index.json"
import tools from "../../public/data/tools/index.json";
import tecnicas from '../../public/data/tecnicas/index.json';

type Categoria = 'ctfs' | 'tools' | 'tecnicas';

const indexMap: Record<Categoria, { title: string; slug: string; categoria: string; }[]> = {
  ctfs,
  tools,
  tecnicas,
};

export function getCategoriaIndex(categoria: Categoria) {
  return indexMap[categoria] ?? [];
}

