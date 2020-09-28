# DOM Stating



## General



`statement host { styles }`

```mermaid
graph TB
source(["&lt;source>"])
target(["&lt;target>"])

onchange>onchange]
:condition>:condition]

__modifier[__modifier]

body["{color: red}"]

var-assign["{--main: red}"]
body-var["{color: var(--main)}"]

source --> onchange --> var-assign & __modifier
source --> :condition --> body & var-assign

var-assign -.-> body-var
body & body-var --> target

```



Applying:

- CSS selector: `source:condition ~* target { body }` 
- BEM via JS: `target__modifier { body }`

Body: 

- CSS rules: `{ color: red }`
- CSS vars: `{ color: var(--color-main) }`



CSS:

considiton ~ * host { rules }

JS:

on(condition) => $$(host).classNames.switch(rulesId)

on(condition) => $$(host)



## Use cases

- Collapser/Expander/Toggler/Sort
- "Jumper"
- Tabs/Switcher
- Target
- Search
- Set Item's Title and Propagate



## MVC





## Reactive

- `var()` is observable
- Listener - any element
  - assigned to some host
  - Scope is inherited
- <Radio property value>:checked
  - --property: value
  - --property: --property-index