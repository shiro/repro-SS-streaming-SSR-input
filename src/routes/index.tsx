import { Title } from "solid-start";
import {createResource, Show, Suspense} from "solid-js";
import Counter from "~/components/Counter";


const Foo = (props) => {
  return (
    <div>
      <p>hello '{props.name}'</p>
    </div>
  );
};

export default function Home() {
  const [query] = createResource(async () => {
    console.log(1)
    await new Promise(r => {setTimeout(() => r(0), 4000)});
    console.log(2)
    return {name: "bob"};
  });

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
      <div>
        <Suspense fallback={"loading..."}>
          <Foo name={query()?.name} />
        </Suspense>
      </div>
    </main>
  );
}
