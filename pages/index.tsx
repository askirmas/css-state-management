import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

type tDivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export default Start

function Start() {
  return <main>
    <h2>Menu</h2>
    <section>
      <h3>Boolean</h3>
      <article>
        <input type="checkbox" id="menu" className="Menu Model Boolean"/>
        <label htmlFor="menu" className="Menu Controller"/>
        <MenuViewer/>
      </article>
      <h3>FocusWithin</h3>
      <article>
        <div className="Menu Model FocusWithin">
          <div className="Menu Controller" tabIndex={0}/>
          <MenuViewer/>
        </div>
      </article>
      <h3>Hover</h3>
      <article>
        <div className="Menu Model Hover">
          <div className="Menu Controller"/>
          <MenuViewer/>
        </div>
      </article>
    </section>
    <h3>TODO</h3>
    <ul>
      <li>Nested</li>
      <li>Hide </li>
    </ul>
    <h2>Collapser/Expander</h2>
    <section>
      <div>:checked</div>
    </section>
    <section>
      <h2>Tab</h2>
      <div>:checked</div>
    </section>
    <h2>Tabel</h2>
    <section>
      <div></div>
    </section>
    <h2>Search</h2>
    <section>
      <div></div>
    </section>
    <h2>Propagate</h2>
    <section>
      <div></div>
    </section>
  </main>
}

function MenuViewer ({className, ...props}: tDivProps) {
  const block = "Menu"
  , length = 3
  , children: ReactNode[] = new Array(length)
  
  for (let key = length; key--;)
    children[key] = <div {...{
      key,
      "className": `${block} Item ${className ?? ""}`,
      ...props
    }}/>


  return <div className={`${block} Viewer`}>{
    children
  }</div>
}