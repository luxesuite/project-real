import { format, parse } from 'date-fns';

export function dateSort(items:any[]){
   const sortedItems = [...items].sort((a, b) => {
    const dateA:any = parse(a.date, "M/d/yyyy, h:mm:ss a", new Date());
    const dateB:any = parse(b.date, "M/d/yyyy, h:mm:ss a", new Date());
    return dateB - dateA;
  });
  return sortedItems
}