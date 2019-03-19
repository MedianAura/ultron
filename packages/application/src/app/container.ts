import getDecorators from "inversify-inject-decorators";
import { Container } from "inversify";

const container = new Container();

let {lazyInject, lazyMultiInject, lazyInjectTagged, lazyInjectNamed} = getDecorators(container)
export {lazyInject, lazyMultiInject, lazyInjectTagged, lazyInjectNamed}

export default container;
