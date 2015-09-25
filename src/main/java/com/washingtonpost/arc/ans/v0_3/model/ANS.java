package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.washingtonpost.arc.ans.ANSVersion;
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
    @Type(value = Gallery.class, name = "gallery"),
    @Type(value = Image.class, name = "image"),
    @Type(value = Media.class, name = "media"),
    @Type(value = Story.class, name = "story"),
    @Type(value = Text.class, name = "text"),
    @Type(value = Video.class, name = "video")
})
public class ANS implements TraitTyped, TraitId {

    // Globally unique ID
    @JsonProperty("_id")
    private String id;
    
    // The runtime type of this object (see getter/setter for implementation details)
    @JsonIgnore
    private String type;

    @JsonProperty("version")
    private ANSVersion version;

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
     * Use @JsonIgnore here to avoid having 2 "type":"foo" strings in serialized JSON
     * See https://stackoverflow.com/questions/18237222/duplicate-json-field-with-jackson
     * @return The concrete type of this ANS object
     */
    @JsonIgnore
    @Override
    public String getType() {
        return type;
    }

    /**
     * Define @JsonProperty("type") here to enable deserialization to save into a field our application code can access
     * @param type The concrete type of this ANS object
     */
    @JsonProperty("type")
    @Override
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return version the ANS version of this ANS object; this is allowed to be Null because we want to avoid the problem
     * of forcing every single content element in a large collection to repetitively declare their version when they should
     * be able to derive the version from their parent/containing ANS object (e.g. Story, Gallery, etc)
     */
    public String getVersion() {
        return (version == null) ? null : version.toString();
    }

    /**
     * @param version the ANS version of this ANS object
     */
    public void setVersion(String version) {
        this.version = ANSVersion.fromString(version);
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
                .append(version)
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
                    .append(version, that.version)
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
