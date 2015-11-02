package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import java.util.List;

/**
 * <p>Models an ordered list element in an ANS Content object</p>
 */
public class OrderedList extends ListElement {

    public static final String TYPE = "ol";

    @JsonProperty("items")
    private List<ListElement> items;

    public OrderedList() {
        setType(TYPE);
    }
    /**
     * @return The items
     */
    public List<ListElement> getItems() {
        return items;
    }

    /**
     * @param items the list of items
     */
    public void setItems(List<ListElement> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(items)
                .appendSuper(super.hashCode())
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        boolean result = false;

        if (other instanceof OrderedList) {
            OrderedList that = (OrderedList) other;
            result = that.canEqual(this)
                    && new EqualsBuilder()
                    .append(items, that.items)
                    .appendSuper(super.equals(other))
                    .isEquals();
        }
        return result;
    }

    /**
     * See http://www.artima.com/lejava/articles/equality.html for why we're doing this (it's essentially required at all levels
     * of a heirarchy to make the .equals() reflexivity property work.
     *
     * @param other The object we're being compared against
     * @return true, if it's an instanceof this class type
     */
    @Override
    public boolean canEqual(Object other) {
        return (other instanceof OrderedList);
    }

}
