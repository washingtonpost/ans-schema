
package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * An image.
 * <p>
 * Holds attributes of an ANS image component.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Image extends Media {

    public static final String TYPE = "image";

    @JsonProperty("subtitle")
    private String subtitle;

    @JsonProperty("caption")
    private String caption;

    @JsonProperty("url")
    private String url;

    @JsonProperty("height")
    private Integer height;

    @JsonProperty("width")
    private Integer width;

    public Image() {
        setType(TYPE);
    }

    /**
     * @return Subtitle for the image.
     */
    public String getSubtitle() {
        return subtitle;
    }

    /**
     * @param subtitle Subtitle for the image.
     */
    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    /**
     * @return Caption for the image.
     */
    public String getCaption() {
        return caption;
    }

    /**
     * @param caption Caption for the image.
     */
    public void setCaption(String caption) {
        this.caption = caption;
    }

    /**
     * @return URL for the image.
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url URL for the image.
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * @return Height for the image.
     */
    public Integer getHeight() {
        return height;
    }

    /**
     *
     * @param height Height for the image.
     */
    public void setHeight(Integer height) {
        this.height = height;
    }

    /**
     * @return Width for the image.
     */
    public Integer getWidth() {
        return width;
    }

    /**
     * @param width Width for the image.
     */
    public void setWidth(Integer width) {
        this.width = width;
    }


    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(this.caption)
                .append(this.height)
                .append(this.subtitle)
                .append(this.url)
                .append(this.width)
                .appendSuper(super.hashCode())
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Image) == false) {
            return false;
        }
        Image rhs = ((Image) other);
        return new EqualsBuilder()
                .append(this.caption, rhs.caption)
                .append(this.height, rhs.height)
                .append(this.subtitle, rhs.subtitle)
                .append(this.url, rhs.url)
                .append(this.width, rhs.width)
                .appendSuper(super.equals(other))
                .isEquals();
    }

    @Override
    public boolean canEqual(Object other) {
        return (other instanceof Image);
    }
}
