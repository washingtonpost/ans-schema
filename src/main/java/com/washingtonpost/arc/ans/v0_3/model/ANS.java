package com.washingtonpost.arc.ans.v0_3.model;

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
    include = JsonTypeInfo.As.EXISTING_PROPERTY,
    property = "type",
    visible = true)
@JsonSubTypes({
    @Type(value = ANS.class, name = ANS.TYPE),
    @Type(value = Content.class, name = Content.TYPE),
    @Type(value = Gallery.class, name = Gallery.TYPE),
    @Type(value = Image.class, name = Image.TYPE),
    @Type(value = Media.class, name = Media.TYPE),
    @Type(value = Story.class, name = Story.TYPE),
    @Type(value = Text.class, name = Text.TYPE),
    @Type(value = Video.class, name = Video.TYPE),
    @Type(value = RawHTML.class, name = RawHTML.TYPE),
    @Type(value = ContentList.class, name = ContentList.TYPE),
    @Type(value = Blockquote.class, name = Blockquote.TYPE),
    @Type(value = Audio.class, name = Audio.TYPE)
})
public class ANS implements TraitTyped, TraitId {

    public static final String TYPE = "ans";

    // Globally unique ID
    @JsonProperty("_id")
    private String id;

    // The runtime type of this object (see getter/setter for implementation details)
    @JsonProperty("type")
    private String type;

    // The version of the ANS specification this class/JSON conforms to
    @JsonProperty("version")
    private ANSVersion version;

    public ANS() {
        setType(TYPE);
    }

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
