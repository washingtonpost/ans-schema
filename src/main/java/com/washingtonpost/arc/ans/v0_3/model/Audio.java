package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * <p>Models an audio element(s) in an ANS Content object</p>
 */
public class Audio extends Media {

    public static final String TYPE = "audio";

    @JsonProperty("sourceUrl")
    private String sourceUrl;

    @JsonProperty("mimetype")
    private String mimetype;

    @JsonProperty("autoplay")
    private Boolean autoplay;

    @JsonProperty("controls")
    private Boolean controls;

    @JsonProperty("loop")
    private Boolean loop;

    @JsonProperty("preload")
    private Boolean preload;

    public Audio() {
        setType(TYPE);
    }

    /**
     * @return The source of the audio
     */
    public String getSourceUrl() {
        return sourceUrl;
    }

    /**
     * @param sourceUrl The source of the audio
     */
    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    /**
     * @return The mimetype of the audio
     */
    public String getMimetype() {
        return mimetype;
    }

    /**
     * @param mimetype The mimetype of the audio
     */
    public void setMimetype(String mimetype) {
        this.mimetype = mimetype;
    }

    public void setAutoplay(Boolean autoplay) {
        this.autoplay = autoplay;
    }

    public Boolean getAutoplay() {
        return autoplay;
    }

    public void setControls(Boolean controls) {
        this.controls = controls;
    }

    public Boolean getControls() {
        return controls;
    }

    public void setLoop(Boolean loop) {
        this.loop = loop;
    }

    public Boolean getLoop() {
        return loop;
    }

    public void setPreload(Boolean preload) {
        this.preload = preload;
    }

    public Boolean getPreload() {
        return preload;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(sourceUrl)
                .append(mimetype)
                .append(autoplay)
                .append(controls)
                .append(loop)
                .append(preload)
                .appendSuper(super.hashCode())
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        boolean result = false;

        if (other instanceof Audio) {
            Audio that = (Audio) other;
            result = that.canEqual(this)
                    && new EqualsBuilder()
                    .append(sourceUrl, that.sourceUrl)
                    .append(mimetype, that.mimetype)
                    .append(autoplay, that.autoplay)
                    .append(controls, that.controls)
                    .append(loop, that.loop)
                    .append(preload, that.preload)
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
        return (other instanceof Audio);
    }

}
