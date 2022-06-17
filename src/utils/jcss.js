export default function jcss(object) {
  return Object.keys(object)
    .filter(f => !!object[f])
    .join(' ');
}