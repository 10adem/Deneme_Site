import { jsx as _jsx } from "react/jsx-runtime";
import ekipFotografi from '../assets/ekip_fotografi.png'; // veya .jpg, .svg vb. uzantı
const Hakkimizda = () => {
    return (_jsx("div", { className: "team-photo-container", children: _jsx("img", { src: ekipFotografi, alt: "Ekip Foto\u011Fraf\u0131" }) }));
};
export default Hakkimizda;
