package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * <p>The root level object for every type of ANS object</p>
 */
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type",
    visible = true)
@JsonSubTypes({
    @Type(value = ANS.class, name = "ans"),
    @Type(value = Content.class, name = "content"),
    @Type(value = Media.class, name = "media"),
    @Type(value = Image.class, name = "image"),
    @Type(value = Video.class, name = "video"),
    @Type(value = Collection.class, name = "story"),
    @Type(value = Text.class, name = "text")})
public class ANS implements TraitTyped, TraitId {

    @JsonProperty("id")
    private String id;
    @JsonProperty("type")
    private String type;

    /**
     * @return The globally unique ID of this ANS object
     */
    @Override
    public String getId() {
        return id;
    }

    /**
     * @param id The globally unique ID of this ANS object
     */
    @Override
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return The concrete type of this ANS object
     */
    @Override
    public String getType() {
        return type;
    }

    /**
     * @param type The concrete type of this ANS object
     */
    @Override
    public void setType(String type) {
        this.type = type;
    }

   @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(id)
                .append(type)
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        boolean result = false;

        if (other instanceof ANS) {
            ANS that = (ANS) other;
            result = that.canEqual(this)
                    && new EqualsBuilder()
                    .append(id, that.id)
                    .append(type, that.type)
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
    public boolean canEqual(Object other) {
        return (other instanceof ANS);
    }
}
