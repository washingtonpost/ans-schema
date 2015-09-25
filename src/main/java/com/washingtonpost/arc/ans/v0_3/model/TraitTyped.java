
package com.washingtonpost.arc.ans.v0_3.model;


/**
 * <p>Trait that helps support strongly-typed implementations of this schema.</p>
 * <p>The implementation of this trait is largely accomplished via the @JsonTypeInfo annotation at the head of the ANS class; by
 * declaring the serialization tracking variable "type" to be visible, we allow for a human-readable marker of a concrete
 * type on any subclass of ANS.</p>
 * <p>NOTE that to avoid the "type" attribute showing up twice in serialized JSON, we must play a couple tricks that aren't
 * totally obvious:
 * 1) don't annotate this Trait with any JSON attributes (different from the way other Traits works)
 * 2) Add @JsonIgnore to all references to the {@code type} attribute or getters, except for the setter {@code setType()} in ANS
 *
 */
public interface TraitTyped {

    /**
     * A concrete type to helps support strongly-typed implementations of this schema.
     * (Required)
     * 
     * @return The type of the element
     */
    public String getType();

    /**
     * A concrete type to helps support strongly-typed implementations of this schema.
     * (Required)
     * 
     * @param type  The type
     */
    public void setType(String type);

}
