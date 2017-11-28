import DTOFactory from "./DTOFactory";

export default function fromList(list, className) {
    return list.map(data => DTOFactory.getDTO(className, data))
}