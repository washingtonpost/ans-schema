
package com.washingtonpost.arc.ans.v0_2.model;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "format",
    "url"
})
public class VideoSubtitleUrl {

    /**
     * The format of the subtitles (e.g. SRT, DFXP, WEB_VTT, etc)
     * 
     */
    @JsonProperty("format")
    private String format;
    /**
     * The url of the subtitle stream.
     * 
     */
    @JsonProperty("url")
    private String url;
    @JsonIgnore
    private final Map<String, Object> additionalProperties = new HashMap<>();

    /**
     * The format of the subtitles (e.g. SRT, DFXP, WEB_VTT, etc)
     * 
     * @return
     *     The format
     */
    @JsonProperty("format")
    public String getFormat() {
        return format;
    }

    /**
     * The format of the subtitles (e.g. SRT, DFXP, WEB_VTT, etc)
     * 
     * @param format
     *     The format
     */
    @JsonProperty("format")
    public void setFormat(String format) {
        this.format = format;
    }

    /**
     * The url of the subtitle stream.
     * 
     * @return
     *     The url
     */
    @JsonProperty("url")
    public String getUrl() {
        return url;
    }

    /**
     * The url of the subtitle stream.
     * 
     * @param url
     *     The url
     */
    @JsonProperty("url")
    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(format).append(url).append(additionalProperties).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof VideoSubtitleUrl) == false) {
            return false;
        }
        VideoSubtitleUrl rhs = ((VideoSubtitleUrl) other);
        return new EqualsBuilder()
                .append(format, rhs.format)
                .append(url, rhs.url)
                .append(additionalProperties, rhs.additionalProperties)
                .isEquals();
    }

}
