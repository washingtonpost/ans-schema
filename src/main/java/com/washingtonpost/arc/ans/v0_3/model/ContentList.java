package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * <p>Models an ordered list element in an ANS Content object</p>
 */
public class ContentList extends ContentListElement {

    public static final String TYPE = "list";

    @JsonProperty("items")
    private java.util.List<ANS> items;

    @JsonProperty("list_type")
    private String listType;

    public ContentList() {
        setType(TYPE);
    }

    /**
     * @return The items
     */
    public java.util.List<ANS> getItems() {
        return items;
    }

    /**
     * @param items the list of items
     */
    public void setItems(java.util.List<ANS> items) {
        this.items = items;
    }

    /**
     * @return The subtype
     */
    public String getListType() {
        return listType;
    }

    /**
     * @param listType the list type
     */
    public void setListType(String listType) {
        this.listType = listType;
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

        if (other instanceof ContentList) {
            ContentList that = (ContentList) other;
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
        return (other instanceof ContentList);
    }

}
