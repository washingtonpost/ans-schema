
package com.washingtonpost.arc.ans.v0_2.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * A stream of video.
 * <p>
 * Configuration for a piece of video content, over a stream.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "height",
    "width",
    "filesize",
    "audioCodec",
    "videoCodec",
    "type",
    "url",
    "bitrate",
    "provider"
})
public class VideoStream {

    /**
     * The height of the video.
     * 
     */
    @JsonProperty("height")
    private int height;
    /**
     * The width of the video.
     * 
     */
    @JsonProperty("width")
    private int width;
    /**
     * The size of the video, in bytes.
     * 
     */
    @JsonProperty("filesize")
    private long filesize;
    /**
     * The audio codec.
     * 
     */
    @JsonProperty("audioCodec")
    private String audioCodec;
    /**
     * The video codec.
     * 
     */
    @JsonProperty("videoCodec")
    private String videoCodec;
    /**
     * The type of video (e.g. mp4).
     * 
     */
    @JsonProperty("type")
    private String type;
    /**
     * Where to get the stream from.
     * 
     */
    @JsonProperty("url")
    private String url;
    /**
     * The bitrate of the video
     * 
     */
    @JsonProperty("bitrate")
    private int bitrate;
    /**
     * The provider of the video.
     * 
     */
    @JsonProperty("provider")
    private String provider;

    /**
     * The height of the video.
     * 
     * @return
     *     The height
     */
    @JsonProperty("height")
    public int getHeight() {
        return height;
    }

    /**
     * The height of the video.
     * 
     * @param height
     *     The height
     */
    @JsonProperty("height")
    public void setHeight(int height) {
        this.height = height;
    }

    /**
     * The width of the video.
     * 
     * @return
     *     The width
     */
    @JsonProperty("width")
    public int getWidth() {
        return width;
    }

    /**
     * The width of the video.
     * 
     * @param width
     *     The width
     */
    @JsonProperty("width")
    public void setWidth(int width) {
        this.width = width;
    }

    /**
     * The size of the video, in bytes.
     * 
     * @return
     *     The filesize
     */
    @JsonProperty("fileSize")
    public long getFilesize() {
        return filesize;
    }

    /**
     * The size of the video, in bytes.
     * 
     * @param filesize
     *     The filesize
     */
    @JsonProperty("fileSize")
    public void setFilesize(long filesize) {
        this.filesize = filesize;
    }

    /**
     * The audio codec.
     * 
     * @return
     *     The audioCodec
     */
    @JsonProperty("audioCodec")
    public String getAudioCodec() {
        return audioCodec;
    }

    /**
     * The audio codec.
     * 
     * @param audioCodec
     *     The audioCodec
     */
    @JsonProperty("audioCodec")
    public void setAudioCodec(String audioCodec) {
        this.audioCodec = audioCodec;
    }

    /**
     * The video codec.
     * 
     * @return
     *     The videoCodec
     */
    @JsonProperty("videoCodec")
    public String getVideoCodec() {
        return videoCodec;
    }

    /**
     * The video codec.
     * 
     * @param videoCodec
     *     The videoCodec
     */
    @JsonProperty("videoCodec")
    public void setVideoCodec(String videoCodec) {
        this.videoCodec = videoCodec;
    }

    /**
     * The type of video (e.g. mp4).
     * 
     * @return
     *     The type
     */
    @JsonProperty("type")
    public String getType() {
        return type;
    }

    /**
     * The type of video (e.g. mp4).
     * 
     * @param type
     *     The type
     */
    @JsonProperty("type")
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Where to get the stream from.
     * 
     * @return
     *     The url
     */
    @JsonProperty("url")
    public String getUrl() {
        return url;
    }

    /**
     * Where to get the stream from.
     * 
     * @param url
     *     The url
     */
    @JsonProperty("url")
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * The bitrate of the video
     * 
     * @return
     *     The bitrate
     */
    @JsonProperty("bitrate")
    public int getBitrate() {
        return bitrate;
    }

    /**
     * The bitrate of the video
     * 
     * @param bitrate
     *     The bitrate
     */
    @JsonProperty("bitrate")
    public void setBitrate(int bitrate) {
        this.bitrate = bitrate;
    }

    /**
     * The provider of the video.
     * 
     * @return
     *     The provider
     */
    @JsonProperty("provider")
    public String getProvider() {
        return provider;
    }

    /**
     * The provider of the video.
     * 
     * @param provider
     *     The provider
     */
    @JsonProperty("provider")
    public void setProvider(String provider) {
        this.provider = provider;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(height)
                .append(width)
                .append(filesize)
                .append(audioCodec)
                .append(videoCodec)
                .append(type)
                .append(url)
                .append(bitrate)
                .append(provider)
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof VideoStream) == false) {
            return false;
        }
        VideoStream rhs = ((VideoStream) other);
        return new EqualsBuilder()
                .append(height, rhs.height)
                .append(width, rhs.width)
                .append(filesize, rhs.filesize)
                .append(audioCodec, rhs.audioCodec)
                .append(videoCodec, rhs.videoCodec)
                .append(type, rhs.type)
                .append(url, rhs.url)
                .append(bitrate, rhs.bitrate)
                .append(provider, rhs.provider)
                .isEquals();
    }

}
