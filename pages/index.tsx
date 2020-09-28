const MenuViewer = <div className="Menu Viewer">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
export default Start

function Start() {
  return <main>
    <h2>Menu</h2>
    <section>
      <article>
        <input type="checkbox" id="menu" className="Menu Model Boolean"/>
        <label htmlFor="menu" className="Menu Controller"/>
        {MenuViewer}
      </article>
      <article>
        <div className="Menu Model FocusWithin">
          <div className="Menu Controller" tabIndex={0}/>
          {MenuViewer}
        </div>
      </article>
      <article>
        <div className="Menu Model Hover">
          <div className="Menu Controller"/>
          {MenuViewer}
        </div>
      </article>
    </section>
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